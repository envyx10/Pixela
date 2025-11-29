import { NextResponse } from 'next/server';
import { ItemType } from '@prisma/client';

/**
 * Valid item types for favorites and reviews
 */
export const VALID_ITEM_TYPES = Object.values(ItemType);

/**
 * Check if a string is a valid ItemType
 */
export function isValidItemType(value: string): value is ItemType {
  return VALID_ITEM_TYPES.includes(value as ItemType);
}

/**
 * Create a paginated API response
 */
export function paginatedResponse(
  data: { results: unknown[]; total_pages?: number; total_results?: number },
  page: number
) {
  return NextResponse.json({
    success: true,
    page,
    total_pages: data.total_pages ?? null,
    total_results: data.total_results ?? null,
    data: data.results,
  });
}

/**
 * Create a success API response
 */
export function successResponse(data: unknown, message?: string) {
  return NextResponse.json({
    success: true,
    ...(message && { message }),
    data,
  });
}

/**
 * Create an error API response
 */
export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
