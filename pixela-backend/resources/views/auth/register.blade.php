<x-guest-layout>

    <form method="POST" action="{{ route('register') }}" class="py-4 space-y-6">
        @csrf

        <!-- Titulo del Register -->
        <h2 class="text-[24px] font-['Outfit'] text-white font-bold mb-8">Bienvenido a Pixela | <span class="text-gray-500">Registrarse</span></h2>

        <!-- Name -->
        <div class="relative">
            <x-text-input 
                id="name"
                icon="carbon-user" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="text" 
                name="name" 
                placeholder="Username"
                :value="old('name')" 
                required 
                autofocus 
                autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Email Address -->
        <div class="relative">
            <x-text-input 
                id="email"
                icon="carbon-email" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="email" 
                name="email" 
                placeholder="Email"
                :value="old('email')" 
                required 
                autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Password -->
        <div class="relative">
            <x-text-input 
                id="password"
                icon="carbon-password" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="password"
                name="password"
                placeholder="Contraseña"
                required 
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Confirm Password -->
        <div class="relative">
            <x-text-input 
                id="password_confirmation"
                icon="carbon-checkmark" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="password"
                name="password_confirmation"
                placeholder="Confirmar contraseña"
                required 
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Mensaje de éxito -->
        @if (session('status'))
            <div class="text-green-500 text-[14px] font-['Outfit']">
                {{ session('status') }}
            </div>
        @endif

        <div class="flex items-center gap-10 mt-8">
            <div class="w-1/2">
                <x-rounded-button>
                    Registrar
                </x-rounded-button>
            </div>
            
            <a class="text-[14px] font-['Outfit'] text-[#ec1b69] hover:text-[#ec1b69]/80 transition-colors duration-300" href="{{ route('login') }}">
                {{ __('¿Ya tienes cuenta?') }}
            </a>
        </div>

    </form>

</x-guest-layout>
