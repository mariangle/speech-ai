import { Card, CardHeader, CardContent } from '@/components/ui/card'

import ListModal from '@/components/modals/list-modal'
import ListService from '@/services/list-service'
import EditableTask from '../_components/task-form'

import { notFound } from 'next/navigation'
import { defaultEmoji } from '@/lib/constants'
import LabelService from '@/services/label-service'

interface PageProps {
  params: { listId: string }
}

async function ListPage({ params }: PageProps) {
  const list = await ListService.getList(params.listId)
  const lists = await ListService.getLists()
  const labels = await LabelService.getLabels()

  if (!list) return notFound()

  const title = list.emoji ? `${list.emoji} ${list.name}` : `${defaultEmoji} ${list.name}`

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex-gap">
          <h1 className="font-bold text-xl">{title}</h1>
          <ListModal list={list} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <EditableTask lists={lists} labels={labels} />
        <ul>
          {list.tasks.map((task) => (
            <EditableTask key={task.id} task={task} lists={lists} labels={labels} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
export default ListPage
