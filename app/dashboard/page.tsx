import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import BookmarkForm from './bookmark-form'
import BookmarkList from './bookmark-list'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: profile } = await supabase
    .from('profiles')
    .select('handle')
    .eq('id', user.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <a href="/auth/signout" className="text-sm underline">Log out</a>
      </div>

      {profile && (
        <p className="text-sm text-black-600 mb-4">
          Your public profile:{' '}
          <a href={`/${profile.handle}`} className="underline" target="_blank">
            /{profile.handle}
          </a>
        </p>
      )}

      <BookmarkForm />
      <BookmarkList bookmarks={bookmarks || []} />
    </div>
  )
}
