import Category from "../category/Category";
import User from "../user/User";
import CookingInstructions from "./CookingInstructions";

interface Food {
  _id?: string;
  category_id?: string | Category;
  name: string;
  description?: string;
  cover_url?: string;
  view_count: number;
  is_approved: boolean;
  ingredient?: string[];
  cooking_instructions?: CookingInstructions[];
  created_by?: string | User;
  created_at: string;
  updated_at: string;
}

export default Food;
