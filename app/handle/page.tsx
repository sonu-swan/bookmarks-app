import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const supabase = await createClient()

  // Pehle profile dhundo handle se
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, handle')
    .eq('handle', handle)
    .single()

  if (!profile) {
    notFound()
  }

  // Sirf is user ke PUBLIC bookmarks fetch karo
  // RLS automatically ensure karega ki private bookmarks na aayein
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('id, title, url')
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">@{profile.handle}</h1>

      {bookmarks && bookmarks.length > 0 ? (
        <div className="space-y-3">
          {bookmarks.map((b) => (
            <div key={b.id} className="border rounded p-3">
              <p className="font-medium">{b.title}</p>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                {b.url}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No public bookmarks yet.</p>
      )}
    </div>
  )
}