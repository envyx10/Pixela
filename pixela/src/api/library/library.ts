import { fetchFromAPI } from "../shared/apiHelpers";
import {
  AddLibraryItemDTO,
  LibraryItem,
  LibraryItemWithDetails,
  WatchStatus,
  CheckLibraryResponse,
} from "./types";

const BASE_URL = "/library";

export const libraryAPI = {
  // Listar items de la biblioteca (con detalles opcionales a través de endpoint separado)
  async listWithDetails(
    status?: WatchStatus,
  ): Promise<LibraryItemWithDetails[]> {
    const params = status ? `?status=${status}` : "";
    const response = await fetchFromAPI<{
      success: boolean;
      data: LibraryItemWithDetails[];
    }>(`${BASE_URL}/details${params}`);
    return response.data;
  },

  // Añadir un item a la biblioteca
  async updateStatus(id: number, status: WatchStatus): Promise<LibraryItem> {
    const response = await fetchFromAPI<{
      success: boolean;
      data: LibraryItem;
    }>(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return response.data;
  },

  // Eliminar un item de la biblioteca
  async removeItem(id: number): Promise<void> {
    await fetchFromAPI(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },

  // Añadir a la biblioteca (alias de updateStatus pero creando)
  async addToLibrary(item: AddLibraryItemDTO): Promise<LibraryItem> {
    const response = await fetchFromAPI<{
      success: boolean;
      data: LibraryItem;
    }>(BASE_URL, {
      method: "POST",
      body: JSON.stringify(item),
    });
    return response.data;
  },

  // Verificar si un item está en la biblioteca
  async checkLibraryStatus(
    tmdbId: number,
    itemType: "movie" | "series",
  ): Promise<CheckLibraryResponse> {
    return fetchFromAPI<CheckLibraryResponse>(
      `${BASE_URL}?tmdbId=${tmdbId}&itemType=${itemType}`,
    );
  },
};
