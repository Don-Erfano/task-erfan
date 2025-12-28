export interface UserItem {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
}
export interface UserTableProps {
  users: UserItem[];
  onViewDetails: (user: UserItem) => void;
}
