import React from "react";
import { motion } from "framer-motion";
import ButtonC from "../Snippets/ButtonC";
import { IoLinkOutline } from "react-icons/io5";
import ModalC from "../Snippets/ModalC";
import SubTitle from "../Snippets/SubTitle";
import { LuBrainCircuit } from "react-icons/lu";

export default function Research({ researchDetails }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalInfo, setmodalInfo] = React.useState({
    title: "",
    subhead: "",
    details: "",
  });

  // Every distinct tag across the published works, in order of first appearance.
  const allTags = React.useMemo(
    () => [...new Set(researchDetails.Published.flatMap((a) => a.tags))],
    [researchDetails.Published],
  );
  // All chips start active; clicking one removes/re-adds it from the filter.
  const [activeTags, setActiveTags] = React.useState(() => new Set(allTags));
  const allActive = activeTags.size === allTags.length;

  const toggleTag = (tag) =>
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });

  const chipKeyHandler = (fn) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  // A work stays visible while at least one of its tags is still active.
  const visibleWorks = researchDetails.Published.filter((a) =>
    a.tags.some((t) => activeTags.has(t)),
  );

  return (
    <div className="Research-page topic-sections" id="research">
      <div className="research">
        <SubTitle
          icon={<LuBrainCircuit className="Sub-icon" />}
          title="Research"
          subhead={researchDetails.subHead}
        />
        <div className="interests sub">
          <h3>Interests:</h3>
          {researchDetails.Interests.map((topic) => (
            <div className="topic" key={topic}>
              {topic}
            </div>
          ))}
        </div>
        <div className="published-works sub">
          <h3>Published Works:</h3>
          Filter by topics
          <div
            className="filter-chips"
            aria-label="Filter published works by topic"
          >
            {allTags.map((tag) => {
              const active = activeTags.has(tag);
              return (
                <div
                  key={tag}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  className={
                    "topic filter-chip" + (active ? " active" : " inactive")
                  }
                  onClick={() => toggleTag(tag)}
                  onKeyDown={chipKeyHandler(() => toggleTag(tag))}
                >
                  {tag}
                </div>
              );
            })}
            {!allActive && (
              <div
                role="button"
                tabIndex={0}
                className="topic filter-chip reset"
                onClick={() => setActiveTags(new Set(allTags))}
                onKeyDown={chipKeyHandler(() =>
                  setActiveTags(new Set(allTags)),
                )}
              >
                Reset
              </div>
            )}
          </div>
          <div className="filter-count">
            Showing {visibleWorks.length} of {researchDetails.Published.length}
          </div>
          {visibleWorks.length === 0 && (
            <div className="filter-empty">
              No published works match the selected topics.
            </div>
          )}
          {visibleWorks.map((arti) => (
            <motion.div
              key={arti.Title}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="gradient-shadow article"
            >
              <img className="publogo" src={arti.PubLogo} alt="logo" />
              <div className="art-title">{arti.Title}</div>
              <div className="authors">
                <b>Authors:</b>{" "}
                {arti.Authors.map((auth) =>
                  auth === "Iftekharul Abedeen" ? (
                    <div key={auth}>
                      <b>{auth}</b>
                    </div>
                  ) : (
                    <div key={auth}>{auth}</div>
                  ),
                )}
              </div>
              <div className="pub-info">
                <b>{arti.Type + ": "}</b>
                {arti.Publisher}
              </div>
              <div className="button-row">
                <ButtonC
                  buttonText={"Read"}
                  Type={"b-secondary"}
                  Link={arti.Link}
                  hLink={true}
                />
                <ButtonC
                  buttonText={"PDF"}
                  Type={"b-tertiary"}
                  Link={arti.PDF}
                  hLink={true}
                />
              </div>
              <div className="topics">
                {arti.tags.map((tag) => (
                  <div
                    key={tag}
                    role="button"
                    tabIndex={0}
                    aria-pressed={activeTags.has(tag)}
                    className={
                      "topic" + (activeTags.has(tag) ? "" : " inactive")
                    }
                    onClick={() => toggleTag(tag)}
                    onKeyDown={chipKeyHandler(() => toggleTag(tag))}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="ongoing-works sub">
          <h3>Ongoing Works:</h3>
          {researchDetails.Ongoing.map((topic) => (
            <motion.div
              key={topic.title}
              whileHover={{ scale: 1.05 }}
              className="gradient-shadow article"
            >
              <div className="art-title">{topic.title}</div>
              {topic.Spervisor !== null ? (
                <div className="supervisor">
                  <b>Supervisor:</b>
                  <div
                    className="link"
                    onClick={() => window.open(topic.SupLink)}
                  >
                    {" " + topic.Spervisor + " "}
                    <IoLinkOutline></IoLinkOutline>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pub-info">
                <b>Status: </b>
                {topic.Status}
              </div>
              <ButtonC
                buttonText={"Read Abstract"}
                Type={"b-secondary"}
                hLink={false}
                action={({
                  t = topic.title,
                  s = "Abstract: ",
                  d = topic.abstract,
                }) => {
                  setIsOpen(!isOpen);
                  setmodalInfo({
                    head: t,
                    subhead: s,
                    details: d,
                  });
                }}
              />
              <div className="topics">
                {topic.tags.map((tag) => (
                  <div className="topic" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <ModalC isOpen={isOpen} setIsOpen={setIsOpen} info={modalInfo} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
