
import React from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";

const ShoppingCartDrawer: React.FC = () => {
  const { state, removeItem, updateQuantity, toggleCart } = useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={toggleCart}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-pesto-brown">Your Cart</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart}
            className="text-pesto-brown hover:text-pesto-orange"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag size={48} className="text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-4">
                Add some delicious items to your cart and start your order
              </p>
              <Button 
                onClick={toggleCart}
                className="btn-primary"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ul className="divide-y">
                {state.items.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3 className="text-pesto-brown">{item.name}</h3>
                        <p className="ml-4">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-sm text-pesto-brown hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between text-base font-medium text-pesto-brown mb-4">
                  <p>Subtotal</p>
                  <p>{formatCurrency(state.totalPrice)}</p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground mb-6">
                  Shipping and taxes calculated at checkout
                </p>
                <Button className="w-full btn-primary">
                  Checkout
                </Button>
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    onClick={toggleCart}
                    className="text-sm text-pesto-brown hover:text-pesto-orange"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDrawer;
