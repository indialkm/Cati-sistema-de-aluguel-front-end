// src/pages/Register/Register.jsx
import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Container que no PC é um card e no Mobile ocupa a tela */}
      <div className="bg-white w-full max-w-lg md:max-w-2xl shadow-2xl rounded-[40px] p-8 md:p-12">
        <RegisterForm />
      </div>
    </div>
  );
}