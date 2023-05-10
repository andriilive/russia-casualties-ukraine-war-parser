import { WaitForOptions } from 'puppeteer';

export type CrawlUrl = {
	url: string;
	options?: WaitForOptions & {
		referer?: string;
		referrerPolicy?: string;
	};
};

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			ru_casualties: {
				Row: {
					casualties: Json;
					created_at: string;
					day: number;
				};
				Insert: {
					casualties: Json;
					created_at?: string;
					day?: number;
				};
				Update: {
					casualties?: Json;
					created_at?: string;
					day?: number;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
