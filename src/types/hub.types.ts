export type Hub =  {
    id: string;
    name: string;
    description?: string;
    public: boolean;
    adult: boolean;       
    
    links?: HubLink[];
}

export type HubLink = {
	name: string;
	url: string;
	adult?: boolean;
};