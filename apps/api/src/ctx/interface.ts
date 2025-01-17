export type Session = {
  uid: string;
  name: string;
  email: string;

  projectId: string;
  projectName: string;
};

export type Env = {
  Bindings: CloudflareBindings;
  Variables: {
    session: Session;
  };
};
