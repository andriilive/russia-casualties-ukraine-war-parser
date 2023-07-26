export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
				Relationships: [];
			};
			ru_casualties_dev: {
				Row: {
					airDefenceSystem: number;
					armoredCombatVehicle: number;
					artillerySystem: number;
					copter: number;
					created_at: string | null;
					day: number;
					jet: number;
					militaryPersonnel: number;
					mlrs: number;
					ship: number;
					supplyVehicle: number;
					tank: number;
					uav: number;
				};
				Insert: {
					airDefenceSystem: number;
					armoredCombatVehicle: number;
					artillerySystem: number;
					copter: number;
					created_at?: string | null;
					day?: number;
					jet: number;
					militaryPersonnel: number;
					mlrs: number;
					ship: number;
					supplyVehicle: number;
					tank: number;
					uav: number;
				};
				Update: {
					airDefenceSystem?: number;
					armoredCombatVehicle?: number;
					artillerySystem?: number;
					copter?: number;
					created_at?: string | null;
					day?: number;
					jet?: number;
					militaryPersonnel?: number;
					mlrs?: number;
					ship?: number;
					supplyVehicle?: number;
					tank?: number;
					uav?: number;
				};
				Relationships: [];
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
