export type Session = {
  userId: string;
  username: string;

  projectId: string;
  projectName: string;
};

export type Env = {
  Bindings: CloudflareBindings;
  Variables: {
    session: Session;
  };
};
