<x-guest-layout>

    <form method="POST" action="{{ route('login') }}" class="py-4 space-y-6 max-w-md">
        @csrf

        <!-- Title -->
        <h2 class="text-[24px] font-['Outfit'] text-white font-bold mb-8">Bienvenido a Pixela | <span class="text-gray-500">Iniciar sesión</span></h2>

        <!-- Email Address -->
        <div class="relative mb-5">
            <x-text-input 
                id="email" 
                icon="carbon-email"
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="email" 
                name="email" 
                placeholder="Email"
                :value="old('email')" 
                required 
                autofocus 
                autocomplete="username" />
        </div>

        <!-- Password -->
        <div class="relative mb-5">
            <x-text-input 
                id="password"
                icon="carbon-password" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="password"
                name="password"
                placeholder="Contraseña"
                required 
                autocomplete="current-password" />
        </div>

        <!-- Mensaje de error de autenticación -->
        @if ($errors->has('email'))
            <div class="text-[#ec1b69] text-[14px] font-['Outfit']">
                {{ __('auth.failed') }}
            </div>
        @endif

        <!-- Remember Me -->
        <div class="flex items-center mb-6">
            <label for="remember_me" class="inline-flex items-center cursor-pointer">
                <input id="remember_me" type="checkbox" name="remember" 
                    class="w-4 h-4 rounded border-gray-600 bg-[#181818] text-[#ec1b69] focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <span class="ml-2 text-[15px] font-['Outfit'] text-gray-400 hover:text-gray-300 transition-colors duration-300">
                    {{ __('Recuérdame') }}
                </span>
            </label>
        </div>

        <!-- Iniciar button -->
        <div class="mb-6">
            <x-rounded-button type="submit" class="w-full h-11 text-base">
                Iniciar
            </x-rounded-button>
        </div>
        
        <!-- Enlaces de ayuda -->
        <div class="flex flex-col gap-4">
            @if (Route::has('password.request'))
                <a class="text-[15px] font-['Outfit'] text-gray-400 hover:text-[#ec1b69] transition-colors duration-300" href="{{ route('password.request') }}">
                    {{ __('¿Olvidaste tu contraseña?') }}
                </a>
            @endif
            
            <div class="text-[15px] font-['Outfit'] text-gray-400">
                {{ __('¿No tienes cuenta?') }}
                <a class="ml-2 text-[#ec1b69] hover:text-[#ec1b69]/80 transition-colors duration-300" href="{{ route('register') }}">
                    {{ __('Regístrate') }}
                </a>
            </div>
        </div>
    </form>
</x-guest-layout>
