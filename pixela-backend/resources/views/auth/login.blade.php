<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ env('APP_URL') }}/api/auth/login" class="py-4 space-y-6 max-w-md">
        @csrf

        <!-- Titulo del Login -->
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
            <x-input-error :messages="$errors->get('email')" class="mt-2 text-[14px] font-['Outfit']" />
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
            <x-input-error :messages="$errors->get('password')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

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
                <a class="text-[15px] font-['Outfit'] text-gray-400 hover:text-[#ec1b69] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#181818] rounded-md px-2 -ml-2" href="{{ route('password.request') }}">
                    {{ __('¿Olvidaste tu contraseña?') }}
                </a>
            @endif
            
            <div class="text-[15px] font-['Outfit'] text-gray-400">
                {{ __('¿No tienes cuenta?') }}
                <a class="ml-1 text-[#ec1b69] hover:text-[#ec1b69]/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec1b69] focus:ring-offset-[#181818] rounded-md px-2 py-1" href="{{ route('register') }}">
                    {{ __('Regístrate') }}
                </a>
            </div>
        </div>
    </form>
</x-guest-layout>
