import dotenv from 'dotenv';
import {
  ConductorWorker,
  orkesConductorClient,
  TaskManager,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import { fetchProjectsAll, fetchTreesAll, saveToDB } from "./fetch";

dotenv.config();

async function ecogrowWorkflow() {
  const clientPromise = orkesConductorClient({
    keyId: process.env.CONDUCTOR_KEY_ID!,
    keySecret: process.env.CONDUCTOR_KEY_SECRET!,
    serverUrl: process.env.CONDUCTOR_HOST!,
  });

  const client = await clientPromise;
  const workflowExecutor = new WorkflowExecutor(client);

  const fetchProjectsWorker: ConductorWorker = {
    taskDefName: "ecogrow_fetch_projects",
    execute: async ({ inputData, taskId }) => {
      const projects = await fetchProjectsAll();
      const projectJson = JSON.stringify(projects);

      const executionId = await workflowExecutor.startWorkflow({
        name: "ecogrow_fetch_trees",
        input: {
          "projects": projectJson,
        },
      });

      return {
        outputData: {
          projects: projectJson,
          trees_exec_id: executionId,
        },
        status: "COMPLETED",
      };
    },
  };

  const fetchTreesWorker: ConductorWorker = {
    taskDefName: "ecogrow_fetch_trees",
    execute: async ({ inputData, taskId }) => {
      if (!inputData) {
        return {
          status: "FAILED",
        };
      }
      const projectsJson = inputData.projects;
      const projects = JSON.parse(projectsJson);
      if (!projects) {
        return {
          status: "FAILED",
        };
      }

      for await (const projectWithTrees of fetchTreesAll(projects)) {
        const projectWithTreesJson = JSON.stringify(projectWithTrees);

        await workflowExecutor.startWorkflow({
          name: "ecogrow_save_to_db",
          input: {
            "projectWithTrees": projectWithTreesJson
          },
        });
      }

      return {
        outputData: {
          success: true
        },
        status: "COMPLETED",
      };
    },
  };

  const fetchSitesWorker: ConductorWorker = {
    taskDefName: "ecogrow_save_to_db",
    execute: async ({ inputData, taskId }) => {
      if (!inputData) {
        return {
          status: "FAILED",
        };
      }
      const projectWithTreesJson = inputData.projectWithTrees;
      const projectWithTrees = JSON.parse(projectWithTreesJson);

      if (!projectWithTrees) {
        return {
          status: "FAILED",
        };
      }
      const success = await saveToDB(projectWithTrees);

      return {
        outputData: {
          success,
        },
        status: "COMPLETED",
      };
    },
  };

  const manager = new TaskManager(client, [fetchProjectsWorker, fetchSitesWorker, fetchTreesWorker], {
    options: { pollInterval: 100, concurrency: 3 },
  });

  manager.startPolling();
}

ecogrowWorkflow();