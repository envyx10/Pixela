import { WatchProvider } from './supplements';

/**
 * Props para el componente PlatformCard
 * @interface PlatformCardProps
 * @property {WatchProvider} provider - Proveedor de streaming
 */
export interface PlatformCardProps {
  provider: WatchProvider;
} 



/**
 * Props para el componente StreamingProviders
 * @interface StreamingProvidersProps
 * @property {WatchProvider[]} providers - Proveedores de streaming
 */
export interface StreamingProvidersProps {
  providers: WatchProvider[];
}