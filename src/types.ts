export type UserType = { id: string; room: string; name: string };

export type GameDataType = {
  // TODO: add user type
  users?: Array<UserType>;
  localUser?: string;
  opponentUser?: string;
  room?: string;
};
