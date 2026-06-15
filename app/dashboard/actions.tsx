'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBookmark(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const is_public = formData.get('is_public') === 'on'

  await supabase.from('bookmarks').insert({
    title,
    url,
    is_public,
    user_id: user.id,
  })

  revalidatePath('/dashboard')
}

export async function deleteBookmark(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  await supabase.from('bookmarks').delete().eq('id', id).eq('user_id', user.id)

  revalidatePath('/dashboard')
}

export async function updateBookmark(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const is_public = formData.get('is_public') === 'on'

  await supabase
    .from('bookmarks')
    .update({ title, url, is_public })
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/dashboard')
}
