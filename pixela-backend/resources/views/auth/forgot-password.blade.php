<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4 text-[16px] font-['Outfit'] text-green-500" :status="session('status')" />
    
    <form method="POST" action="{{ route('password.email') }}" class="py-4 space-y-6">
        @csrf

        <!-- Titulo del Recuperar -->
        <h2 class="text-[24px] font-['Outfit'] text-white font-bold mb-8">{{ __('pixela.welcome') }} | <span class="text-gray-500">{{ __('pixela.recover_password') }}</span></h2>

        <div class="mb-6 text-[16px] font-['Outfit'] text-white/80">
            {{ __('pixela.forgot_password_msg') }}
        </div>

        <!-- Email Address -->
        <div class="relative">
            <x-text-input 
                id="email"
                icon="carbon-email" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="email" 
                name="email" 
                placeholder="{{ __('pixela.email') }}"
                :value="old('email')" 
                required 
                autofocus 
                autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <div class="flex items-center gap-10 mt-8">
            <div class="w-1/2">
                <x-rounded-button>
                    {{ __('pixela.send_link_button') }}
                </x-rounded-button>
            </div>
            
            <a class="text-[14px] font-['Outfit'] text-[#ec1b69] hover:text-[#ec1b69]/80 transition-colors duration-300" href="{{ route('login') }}">
                {{ __('pixela.back_to_login') }}
            </a>
        </div>
    </form>
</x-guest-layout>
