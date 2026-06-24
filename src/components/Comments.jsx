import { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, provider } from "../firebase";

function Comments({ postSlug }) {
  const [user, setUser] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [sending, setSending] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!postSlug) return;

    const commentsRef = collection(db, "comments", postSlug, "items");
    const commentsQuery = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(list);
    });

    return () => unsubscribe();
  }, [postSlug]);

  async function handleLogin() {
  if (loginLoading) return;

  setLoginLoading(true);

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Erro ao entrar com Google:", error);

    if (error.code === "auth/cancelled-popup-request") {
      return;
    }

    if (error.code === "auth/popup-closed-by-user") {
      return;
    }

    alert(`Erro ao entrar: ${error.code}`);
  } finally {
    setLoginLoading(false);
  }
}

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!postSlug) {
      alert("Erro: o post não foi identificado.");
      return;
    }

    if (!user) {
      alert("Entre com Google para comentar.");
      return;
    }

    if (!commentText.trim()) {
      alert("Escreva um comentário antes de enviar.");
      return;
    }

    setSending(true);

    try {
      const commentsRef = collection(db, "comments", postSlug, "items");

      await addDoc(commentsRef, {
        text: commentText.trim(),
        userId: user.uid,
        userName: user.displayName || "Usuário",
        userPhoto: user.photoURL || "",
        createdAt: serverTimestamp(),
        editedAt: null,
      });

      setCommentText("");
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      alert(`Erro ao enviar comentário: ${error.code}`);
    } finally {
      setSending(false);
    }
  }

  function startEditing(comment) {
    setEditingId(comment.id);
    setEditingText(comment.text);
    setOpenMenuId(null);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingText("");
  }

  async function saveEdit(commentId) {
    if (!editingText.trim()) {
      alert("O comentário não pode ficar vazio.");
      return;
    }

    try {
      const commentRef = doc(db, "comments", postSlug, "items", commentId);

      await updateDoc(commentRef, {
        text: editingText.trim(),
        editedAt: serverTimestamp(),
      });

      cancelEditing();
    } catch (error) {
      console.error("Erro ao editar comentário:", error);
      alert(`Erro ao editar comentário: ${error.code}`);
    }
  }

  async function deleteComment(commentId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este comentário?"
    );

    if (!confirmDelete) return;

    try {
      const commentRef = doc(db, "comments", postSlug, "items", commentId);
      await deleteDoc(commentRef);
      setOpenMenuId(null);
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      alert(`Erro ao excluir comentário: ${error.code}`);
    }
  }

  return (
    <section className="comments-section">
      <div className="comments-header">
        <p className="eyebrow">Comentários</p>
        <h2>Participe da conversa</h2>
        <p>Entre com sua conta Google para comentar neste post.</p>
      </div>

      {!user && (
        <button
          className="google-login-button"
          onClick={handleLogin}
          disabled={loginLoading}
        >
          {loginLoading ? "Abrindo Google..." : "Entrar com Google"}
        </button>
      )}

      {user && (
        <>
          <div className="comment-user-box">
            <div className="comment-user-info">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Usuário"}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="comment-avatar-fallback">
                  {(user.displayName || "U").charAt(0)}
                </div>
              )}

              <div>
                <strong>{user.displayName}</strong>
                <span>Conectado com Google</span>
              </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              Sair
            </button>
          </div>

          <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escreva seu comentário..."
              maxLength={500}
            />

            <div className="comment-form-footer">
              <span>{commentText.length}/500</span>

              <button type="submit" disabled={!commentText.trim() || sending}>
                {sending ? "Enviando..." : "Comentar"}
              </button>
            </div>
          </form>
        </>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            Ainda não há comentários. Seja o primeiro!
          </p>
        ) : (
          comments.map((comment) => {
            const isOwner = user?.uid === comment.userId;
            const isEditing = editingId === comment.id;

            return (
              <article className="comment-card" key={comment.id}>
                <div className="comment-card-top">
                  <div className="comment-author">
                    {comment.userPhoto ? (
                      <img
                        src={comment.userPhoto}
                        alt={comment.userName}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="comment-avatar-fallback">
                        {(comment.userName || "U").charAt(0)}
                      </div>
                    )}

                    <div>
                      <strong>{comment.userName}</strong>
                      {comment.editedAt && <span>Editado</span>}
                    </div>
                  </div>

                  {isOwner && !isEditing && (
                    <div className="comment-menu">
                      <button
                        className="comment-menu-button"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === comment.id ? null : comment.id
                          )
                        }
                        aria-label="Abrir menu do comentário"
                      >
                        ⋯
                      </button>

                      {openMenuId === comment.id && (
                        <div className="comment-menu-dropdown">
                          <button onClick={() => startEditing(comment)}>
                            Editar
                          </button>

                          <button
                            className="danger"
                            onClick={() => deleteComment(comment.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="comment-edit-box">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      maxLength={500}
                    />

                    <div className="comment-actions">
                      <button onClick={() => saveEdit(comment.id)}>
                        Salvar
                      </button>

                      <button className="secondary" onClick={cancelEditing}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{comment.text}</p>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Comments;