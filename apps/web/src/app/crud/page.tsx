"use client";

import React, { useEffect, useState } from "react";

type User = { id: number; email: string; name?: string };
type Post = {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  authorId: number;
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function CrudPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Form States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState<number | undefined>(undefined);
  const [published, setPublished] = useState(false);

  // UX States
  const [loading, setLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  async function refresh() {
    try {
      const [uRes, pRes] = await Promise.all([
        fetch(`${apiBase}/users`),
        fetch(`${apiBase}/posts`),
      ]);
      if (uRes.ok && pRes.ok) {
        setUsers(await uRes.json());
        setPosts(await pRes.json());
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${apiBase}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      setEmail("");
      setName("");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!authorId) return;
    setLoading(true);
    try {
      await fetch(`${apiBase}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorId, published }),
      });
      setTitle("");
      setContent("");
      setPublished(false);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function runSeed() {
    setIsSeeding(true);
    try {
      await fetch(`${apiBase}/seed`, { method: "POST" });
      await refresh();
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage users and posts</p>
          </div>
          <button
            onClick={runSeed}
            disabled={isSeeding}
            className={`mt-4 md:mt-0 px-4 py-2 rounded-md text-sm font-medium text-white transition-colors
              ${isSeeding ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
          >
            {isSeeding ? "Seeding Database..." : "Reset & Seed DB"}
          </button>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create User Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3 text-sm">01</span>
              Create User
            </h2>
            <form onSubmit={createUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Add User"}
              </button>
            </form>
          </div>

          {/* Create Post Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-green-100 text-green-600 p-2 rounded-full mr-3 text-sm">02</span>
              Create Post
            </h2>
            <form onSubmit={createPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  required
                  placeholder="My First Post"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={2}
                  placeholder="Write something amazing..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900 bg-white"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                    value={authorId ?? ""}
                    onChange={(e) => setAuthorId(Number(e.target.value))}
                  >
                    <option value="" disabled>Select author</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>{u.name || u.email}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-700">Publish?</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !authorId}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Create Post"}
              </button>
            </form>
          </div>
        </div>

        {/* Data Lists Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Users List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Registered Users</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{users.length} total</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {users.length === 0 ? (
                <p className="p-8 text-center text-gray-500">No users found. Create one above.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <li key={u.id} className="p-4 hover:bg-gray-50 transition flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold">
                          {u.name?.[0]?.toUpperCase() || u.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{u.name || "Unnamed"}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">ID: {u.id}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Posts List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Recent Posts</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{posts.length} total</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {posts.length === 0 ? (
                <p className="p-8 text-center text-gray-500">No posts yet. Write something above.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {posts.map((p) => (
                    <li key={p.id} className="p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate pr-4">{p.title}</h4>
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-wide font-bold rounded-full 
                          ${p.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      {p.content && <p className="text-xs text-gray-500 line-clamp-2 mb-2">{p.content}</p>}
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Author ID: {p.authorId}</span>
                        <span className="font-mono">#{p.id}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}