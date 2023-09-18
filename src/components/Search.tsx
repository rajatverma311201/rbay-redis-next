"use client";

import React, { useState, useEffect, useCallback } from "react";
import debounce from "@/utils/debounce";
// import { get } from "./fetch"; // Adjust the import path as needed
import { get } from "@/utils/fetch";

const Search: React.FC = () => {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);
    const [err, setErr] = useState("");
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const search = useCallback(
        (searchTerm: string) => {
            const debouncedSearch = debounce(async () => {
                const qs = new URLSearchParams({ term: searchTerm });
                setLoading(true);

                try {
                    const [data, error] = await get(
                        `/items/search?${qs.toString()}`,
                    );

                    // const [data, error] = [{ results: [] }, null];
                    setLoading(false);

                    if (error) {
                        setErr(error);
                    } else {
                        setResults(data.results || []);

                        if (data.results.length === 0) {
                            setErr("No Results");
                        } else {
                            setErr("");
                        }
                    }
                } catch (error) {
                    setLoading(false);
                    setErr("An error occurred while fetching results.");
                }
            }, 300);

            return debouncedSearch;
        },
        [setLoading, setErr, setResults],
    );

    useEffect(() => {
        if (term) {
            search(term);
        } else {
            setResults([]);
        }
    }, [term, search]);

    const handleInputClick = () => {
        setFocused(true);
    };

    const handleWindowClick = () => {
        setFocused(false);
    };

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    return (
        <div className="relative ml-4 flex h-10 w-96 rounded-full border border-gray-300 text-sm">
            <input
                type="search"
                name="search"
                placeholder="Search"
                className="w-full rounded-full px-4 text-sm focus:outline-none"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onClick={handleInputClick}
            />

            {focused && (loading || err || results.length) && (
                <div className="absolute top-[110%] z-40 w-full rounded border bg-gray-50 shadow">
                    {loading ? (
                        <div className="p-2">Loading...</div>
                    ) : err ? (
                        <div className="p-2">{err}</div>
                    ) : results.length ? (
                        <div className="flex flex-col gap-0.5 bg-gray-200">
                            {results.map(
                                (item: { id: string; name: string }) => (
                                    <a key={item.id} href={`/items/${item.id}`}>
                                        <div className="bg-white p-4 hover:bg-gray-50">
                                            {item.name}
                                        </div>
                                    </a>
                                ),
                            )}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Search;
