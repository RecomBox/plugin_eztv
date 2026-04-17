import type * as get_torrents_types from "@plugin_provider/global/types/get_torrents";

import request from "@plugin_provider/method/request";

export default async function get_torrents(input_payload: get_torrents_types.InputPayload): Promise<get_torrents_types.OutputPayload> {

    let new_output_payload: get_torrents_types.OutputPayload = [];
    let seeds: number[] = [];

    let id_obj = JSON.parse(input_payload.id);
    let imdb_id = id_obj["imd_id"];
    let s = parseInt(id_obj["s"]);
    let e = parseInt(id_obj["e"]);

    let current_page = 1;

    while (true) {
        let url = `https://eztvx.to/api/get-torrents?imdb_id=${imdb_id}&page=${current_page}&limit=100`;

        let res = await new request({
            method: "get",
            url
        }).send();
        let data = res.body_json();
        let result_list = data["torrents"]??[];


        if (result_list.length == 0) break;

        if (result_list[0]["imdb_id"] !== imdb_id) break;
        
        for (let result of result_list) {
            // console.log(result["season"]??"", s);
            // console.log(result["episode"]??"", e);
            // console.log("===")
            if (
                (parseInt(result["season"]) !== s)
                || (parseInt(result["episode"]) !== e)
                || (parseInt(result["seeds"]) === 0)
            ) continue;
            new_output_payload.push({
                title: result["title"]??"",
                torrent_url: result["magnet_url"]??"",
            })
            seeds.push(parseInt(result["seeds"] ?? "0"));
            console.log(result["seeds"] ?? 0);
        }
        current_page++;

        if (new_output_payload.length >= 100) break;
    };

    let sorted_indices = seeds
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => b.val - a.val)
    .map(obj => obj.idx);

    let sorted_payload: get_torrents_types.OutputPayload = sorted_indices.map(
        idx => new_output_payload[idx]!
    );
    
    return sorted_payload;
}