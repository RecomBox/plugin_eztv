import type * as get_sources_types from "@plugin_provider/global/types/get_sources";
import type * as get_torrents_types from "@plugin_provider/global/types/get_torrents";



export async function get_sources(input_payload: get_sources_types.InputPayload): Promise<get_sources_types.OutputPayload> {
    if (input_payload.page > 1) return [];
    
    const get_sources = await import("./get_sources");

    return await get_sources.default(input_payload);
    
}

export async function get_torrents(input_payload: get_torrents_types.InputPayload): Promise<get_torrents_types.OutputPayload> {
    if (input_payload.page > 1) return [];
    
    const get_torrents = await import("./get_torrents");

    return await get_torrents.default(input_payload);
}