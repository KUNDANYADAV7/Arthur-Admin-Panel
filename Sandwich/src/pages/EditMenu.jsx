import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useMenus } from "../context/MenuContexts";
import MenuForm from "../components/menu/MenuForm";

const EditMenu = () => {
  const { id } = useParams();
  const { menus } = useMenus();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    if (id) {
      const item = menus.find(item => item._id === id); // Use _id for matching
      if (item) {
        setMenuItem(item);
      } else {
        toast({
          title: "Menu item not found",
          description: "The menu item you are trying to edit does not exist.",
        });
        navigate('/menu');
      }
    }
  }, [id, menus, navigate, toast]);

  if (!menuItem) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Edit Menu Item</h1>
      <MenuForm initialMenuItem={menuItem} isEditing={true} />
    </div>
  );
};

export default EditMenu;
