export const NutritionSection = ({
  protein,
  carbs,
  vitamins,
  healthyFats,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg text-[#5a1c00] font-semibold">Nutrition Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="protein" className="block text-sm text-[#5a1c00]">Protein (grams)</label>
          <input
            type="text"
            id="protein"
            name="protein"
            value={protein}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            min="0"
            placeholder="0"
          />
        </div>
        
        <div>
          <label htmlFor="carbs" className="block text-sm text-[#5a1c00]">Carbs (grams)</label>
          <input
            type="text"
            id="carbs"
            name="carbs"
            value={carbs}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            min="0"
            placeholder="0"
          />
        </div>
        
        <div>
          <label htmlFor="vitamins" className="block text-sm text-[#5a1c00]">Vitamins</label>
          <input
            type="text"
            id="vitamins"
            name="vitamins"
            value={vitamins}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="A, C, D, etc."
          />
        </div>

        <div>
          <label htmlFor="healthyFats" className="block text-sm text-[#5a1c00]">Healthy Fats (grams)</label>
          <input
            type="text"
            id="healthyFats"
            name="healthyFats"
            value={healthyFats}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};
