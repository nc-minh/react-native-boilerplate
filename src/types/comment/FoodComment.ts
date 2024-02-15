import User from "../user/User";

export default interface FoodComment {
  _id: string;
  content: string;
  foods_id: string;
  created_by: User;
  created_at: string;
  updated_at: string;
}
