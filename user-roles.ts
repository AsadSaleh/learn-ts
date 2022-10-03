const userRoles = {
  admin: ["create", "update", "delete", "view"],
  user: ["update", "view"],
  anonymous: ["view"],
} as const;

type UserRoles = typeof userRoles;

const canRolePerformAction = <TRole extends keyof UserRoles>(
  role: TRole,
  action: UserRoles[TRole][number]
): boolean => {
  const arrOfMembers = userRoles[role];

  return arrOfMembers.includes(action as any);
};

// Usage
console.log(canRolePerformAction("user", "update"));
console.log(canRolePerformAction("anonymous", "view"));
