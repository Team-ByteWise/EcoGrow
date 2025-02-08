import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CommunityBanner() {
  return (
    <Card className="bg-green-600 text-white">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h3 className="text-xl font-bold">
            Want to make a bigger impact?
          </h3>
          <p className="text-green-50">
            Start a community challenge or sponsor a forest!
          </p>
        </div>
        <Button variant="secondary" size="lg">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}

