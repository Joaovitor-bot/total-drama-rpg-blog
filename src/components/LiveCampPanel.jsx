import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { participantes } from "../data";
import { db } from "../firebase";

const POLL_ID = "favoritos-temporada-1";

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getVoteOptionIds(vote) {
  if (Array.isArray(vote.optionIds)) {
    return vote.optionIds.map(String);
  }

  if (vote.optionId) {
    return [String(vote.optionId)];
  }

  return [];
}

function LiveCampPanel({ posts = [] }) {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const votesRef = collection(db, "polls", POLL_ID, "votes");

    const unsubscribe = onSnapshot(votesRef, (snapshot) => {
      const list = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setVotes(list);
    });

    return () => unsubscribe();
  }, []);

  const totalParticipantes = participantes.length;

  const totalEliminados = participantes.filter(
    (participante) => participante.status?.toLowerCase() === "eliminado"
  ).length;

  const totalEpisodios = useMemo(() => {
    const episodios = posts.filter((post) => {
      const categories = Array.isArray(post.categories)
        ? post.categories.join(" ")
        : "";

      const searchText = normalizeText(`${post.title} ${categories}`);

      return searchText.includes("episodio");
    });

    return episodios.length > 0 ? episodios.length : 1;
  }, [posts]);

  const favoriteResult = useMemo(() => {
    const countMap = {};

    participantes
      .filter(
        (participante) =>
          participante.status?.toLowerCase() !== "eliminado"
      )
      .forEach((participante) => {
        countMap[String(participante.id)] = {
          id: String(participante.id),
          name: participante.nome,
          votes: 0,
        };
      });

    votes.forEach((vote) => {
      const optionIds = getVoteOptionIds(vote);

      optionIds.forEach((optionId) => {
        if (countMap[optionId]) {
          countMap[optionId].votes += 1;
        }
      });
    });

    const results = Object.values(countMap).sort((a, b) => b.votes - a.votes);
    const highestVotes = results[0]?.votes || 0;

    if (highestVotes === 0) {
      return {
        value: "Em votação",
        label: "Favoritos",
      };
    }

    const leaders = results.filter((result) => result.votes === highestVotes);
    const names = leaders.map((leader) => leader.name).join(", ");

    return {
      value: names,
      label: leaders.length > 1 ? "Favoritos empatados" : "Favorito",
    };
  }, [votes]);

  return (
    <div className="panel live-camp-panel live-camp-panel-wide">
      <span className="camp-tag">Ao vivo do acampamento</span>

      <div className="live-camp-main">
        <div className="live-camp-icon">🎤</div>

        <div>
          <h2>Amber no comando</h2>
          <p>
            A apresentadora está pronta para anunciar provas, tretas e
            reviravoltas.
          </p>
        </div>
      </div>

      <div className="stats-grid live-stats-grid">
        <div className="stat">
          <strong>{formatNumber(totalParticipantes)}</strong>
          <span>Participantes</span>
        </div>

        <div className="stat">
          <strong>{formatNumber(totalEpisodios)}</strong>
          <span>Episódios</span>
        </div>

        <div className="stat">
          <strong>{formatNumber(totalEliminados)}</strong>
          <span>Eliminados</span>
        </div>

        <div className="stat live-favorite-stat">
          <strong>{favoriteResult.value}</strong>
          <span>{favoriteResult.label}</span>
        </div>
      </div>

      <p className="live-updated-note">
        Atualizado automaticamente
      </p>
    </div>
  );
}

export default LiveCampPanel;