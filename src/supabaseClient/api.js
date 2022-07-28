import { supabase } from './client';

export async function addNote(author, user, note) {
  let { _, err } = await supabase.from('notes').insert([{
    "key": author + ":::" + user,
    "note": note,
  }]);
  return !(err);
}

export async function updateNote(author, user, note) {
  let { _, err } = await supabase.from('notes').insert([{
    "key": author + ":::" + user,
    "note": note,
  }]);
  return !(err);
}

export async function getNote(author, user) {
  let { data, err } = await supabase.from('notes').select().match({
    "key": author + ":::" + user,
  });
  console.log(data, err)
  if (!data || data.length === 0) {
    await addNote(author, user, "")
    return "";
  }
  try {
    return data[0].note;
  } catch (err) {
    return "";
  }
}
