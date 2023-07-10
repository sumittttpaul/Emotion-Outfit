'use server';

import connectdatabases from 'databases/ConnectDB';
import { TagForUserProfile } from 'databases/TagDB';
import { DBCreateMessage } from 'databases/message/Message.UserProfile';
import { revalidateTag } from 'next/cache';
import userProfileDB from 'databases/schema/Schema.UserProfile';

export async function CREATE_USER_PROFILE({ _data }: POSTType) {
  connectdatabases();
  await userProfileDB.create(_data);
  revalidateTag(TagForUserProfile);
  return DBCreateMessage as ISuccess;
}

export async function UPDATE_USER_PROFILE({ _uid, _data }: PUTType) {
  connectdatabases();
  await userProfileDB.findOneAndUpdate({ _uid: _uid }, { $set: _data });
  revalidateTag(TagForUserProfile);
  return DBCreateMessage as ISuccess;
}

export async function DELETE_USER_PROFILE({ _uid }: DELETEType) {
  connectdatabases();
  await userProfileDB.findOneAndDelete({ _uid: _uid });
  revalidateTag(TagForUserProfile);
  return DBCreateMessage as ISuccess;
}
