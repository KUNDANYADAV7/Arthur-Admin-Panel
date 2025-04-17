
import MenuForm from "../components/menu/MenuForm";

const CreateMenu = () => {
  return (
    <div className="space-y-6">
      <div className="md:mx-14">
        <h1 className="text-3xl font-bold tracking-tight text-sandwich-900 mt-8 md:mt-0">Create Menu Item</h1>
        <p className="text-muted-foreground mt-2">
          Add a new item to your menu with detailed information
        </p>
      </div>

      <MenuForm />
    </div>
  );
};

export default CreateMenu;
