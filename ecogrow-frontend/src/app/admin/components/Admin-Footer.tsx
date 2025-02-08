import Link from "next/link";

export function AdminFooter() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <Link href="/dashboard" className="hover:text-green-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/eco-education" className="hover:text-green-300">
                  Eco-Education Hub
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-center md:text-right">
            Every tree counts. Keep planting and inspiring change!
          </p>
        </div>
      </div>
    </footer>
  );
}
