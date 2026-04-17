import type * as get_sources_types from "@plugin_provider/global/types/get_sources";


export default async function get_sources(input_payload: get_sources_types.InputPayload): Promise<get_sources_types.OutputPayload> {
    let imdb_id = input_payload.id.replace("tt", "");
    let new_id_obj = {
        imd_id: imdb_id,
        s: input_payload.season,
        e: input_payload.episode
    };
    return [
        {
            id: JSON.stringify(new_id_obj),
            title: `${input_payload.title} S${input_payload.season.toString().padStart(2, '0')}E${input_payload.episode.toString().padStart(2, '0')}`
        }
    ];
}