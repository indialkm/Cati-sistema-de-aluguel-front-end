import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartIcon = ({ itemCount }) => {
  return (
    <Link 
      to="/carrinho" 
      className="group relative p-2 flex items-center justify-center transition-all duration-300"
      aria-label="Ver carrinho de reservas"
    >
      {/* O Ícone Principal */}
      <ShoppingBagIcon 
        className="h-7 w-7 text-gray-700 group-hover:text-pink-500 transition-colors" 
      />

      {/* Badge Dinâmico: Só renderiza se houver itens */}
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[11px] font-bold text-white ring-2 ring-white animate-in fade-in zoom-in duration-300">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;