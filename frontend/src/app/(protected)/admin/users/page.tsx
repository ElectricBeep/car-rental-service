import { getServerSession } from "next-auth/next";

import { getApiClient } from "@/lib/api";
import { authOptions } from "@/lib/auth";

const UsersPage = async () => {
  const session = await getServerSession(authOptions)
  const apiClient = await getApiClient(session);

  const users = await apiClient.users.getUsers();

  return (
    <div className="px-8 py-4">
    </div>
  );
};

export default UsersPage;
