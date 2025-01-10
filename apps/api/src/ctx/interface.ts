export type Session = {
  userId: string;
  sessionId: string;
};

export type Env = {
  Bindings: CloudflareBindings;
  Variables: {
    session: Session;
  };
};
