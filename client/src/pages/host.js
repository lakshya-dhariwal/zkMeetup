import React, { useEffect, useState, useRef } from "react";
import Tabs from "../components/tabs";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

function Host() {
  const { address, isConnected } = useAccount();
  const [showForm, setShowForm] = React.useState(false);
  const [gating, setGating] = useState();

  const scrollRef = useRef(null);
  useEffect(() => {
    if (showForm) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [showForm]);

  return (
    <div className="section host" aria-labelledby="discover-label mt-5">
      <section className="section hero" aria-label="home">
        <div className="container flex items-center flex-col">
          <h1 className="headline-lg hero-title flex flex-row">
            Host your gated meetup the <span className="span mx-3">web3</span>{" "}
            way
          </h1>

          <div className="grid grid-cols-3 my-5 mb-12 ">
            <div className="p-2 text-gray-200 rounded-lg bg-slate-800 mx-2 px-4">
              ZK based eligiblity check
            </div>
            <div className="p-2 text-gray-200 rounded-lg bg-slate-800 mx-2 px-4">
              {" "}
              NFT Gating and Allow Listing
            </div>
            <div className="p-2 text-gray-200 rounded-lg bg-slate-800 mx-2 px-4">
              {" "}
              Virtual event support using HuddleO1
            </div>
          </div>
          <button
            className="bg-purple-600 rounded-full px-5 py-3 text-white text-3xl"
            onClick={() => {
              if (!isConnected) {
                toast("Connect wallet to host!", {
                  icon: "⚙️",
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              } else setShowForm(true);
            }}
          >
            Host Event
          </button>
        </div>
      </section>
      {showForm && (
        <section className="mt-2 max-w-[800px] mx-auto">
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 dark:hover:bg-bray-800  bg-gray-800 "
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-[60px] h-[60px] mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-3xl text-gray-500 dark:text-gray-400 flex">
                  <span class="font-semibold mx-2">Click to upload</span> event
                  cover image
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>

          <form className="mt-[30px] text-lg">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="event_name"
                  class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                >
                  Event Name <sup className="text-purple-400 text-2xl">*</sup>
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 text-3xl border border-gray-300 text-gray-900 py-4 rounded-xl px-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Huddle01 Video Jam"
                  required
                />
              </div>
              <div></div>
              <div>
                <Tabs
                  activeTab={gating}
                  setActiveTab={setGating}
                  tabs={[
                    { value: "nftgating", title: "NFT Gating" },
                    { value: "allowlist", title: "Allow Listing" },
                  ]}
                />
              </div>
            </div>
            <button
              type="submit"
              ref={scrollRef}
              className="bg-purple-600 rounded-full px-5 py-3 text-white text-xl"
            >
              Make Public
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Host;
