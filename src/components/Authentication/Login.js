import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Pure-SVG Monkey ───────────────────────────────────────────────────────
   showEyes = true  → hands down, eyes open  (password visible)
   showEyes = false → hands over eyes         (password hidden)
─────────────────────────────────────────────────────────────────────────── */
const MonkeySVG = ({ showEyes }) => (
    <svg
        viewBox="0 0 120 120"
        width="112"
        height="112"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* ── Ears (big outer circles) ── */}
        <circle cx="18" cy="62" r="16" fill="#a0522d" />
        <circle cx="18" cy="62" r="10" fill="#d2855a" />
        <circle cx="102" cy="62" r="16" fill="#a0522d" />
        <circle cx="102" cy="62" r="10" fill="#d2855a" />

        {/* ── Head ── */}
        <ellipse cx="60" cy="60" rx="38" ry="40" fill="#a0522d" />

        {/* ── Face patch ── */}
        <ellipse cx="60" cy="68" rx="26" ry="28" fill="#d2855a" />

        {/* ── Eyes (only visible when showEyes=true) ── */}
        {showEyes && (
            <g>
                {/* Left eye */}
                <circle cx="46" cy="55" r="8" fill="white" />
                <circle cx="46" cy="55" r="5" fill="#3b1f0a" />
                <circle cx="48" cy="53" r="2" fill="white" opacity="0.85" />

                {/* Right eye */}
                <circle cx="74" cy="55" r="8" fill="white" />
                <circle cx="74" cy="55" r="5" fill="#3b1f0a" />
                <circle cx="76" cy="53" r="2" fill="white" opacity="0.85" />
            </g>
        )}

        {/* ── Nose ── */}
        <ellipse cx="60" cy="71" rx="9" ry="6" fill="#8b4513" />
        <circle cx="56.5" cy="71" r="2.5" fill="#5c2d0a" />
        <circle cx="63.5" cy="71" r="2.5" fill="#5c2d0a" />

        {/* ── Mouth ── */}
        {showEyes ? (
            /* Happy mouth when eyes open */
            <path
                d="M50 82 Q60 90 70 82"
                stroke="#5c2d0a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
        ) : (
            /* Sheepish grin when covering eyes */
            <path
                d="M51 81 Q60 87 69 81"
                stroke="#5c2d0a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
        )}

        {/* ════════════════════════════════════════════
            HANDS-OVER-EYES  (password hidden)
        ════════════════════════════════════════════ */}
        {!showEyes && (
            <g>
                {/* Left arm sweeping up */}
                <path
                    d="M22 88 Q28 70 36 58 Q40 50 44 50"
                    stroke="#a0522d"
                    strokeWidth="13"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Left palm */}
                <ellipse cx="44" cy="51" rx="15" ry="12" fill="#a0522d" transform="rotate(-20 44 51)" />
                <ellipse cx="44" cy="51" rx="9" ry="7" fill="#d2855a" transform="rotate(-20 44 51)" />
                {/* Left fingers */}
                <ellipse cx="33" cy="44" rx="4.5" ry="3" fill="#a0522d" transform="rotate(-50 33 44)" />
                <ellipse cx="37" cy="40" rx="4.5" ry="3" fill="#a0522d" transform="rotate(-70 37 40)" />
                <ellipse cx="43" cy="38" rx="4.5" ry="3" fill="#a0522d" transform="rotate(-85 43 38)" />
                <ellipse cx="49" cy="39" rx="4.5" ry="3" fill="#a0522d" transform="rotate(-100 49 39)" />

                {/* Right arm sweeping up */}
                <path
                    d="M98 88 Q92 70 84 58 Q80 50 76 50"
                    stroke="#a0522d"
                    strokeWidth="13"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Right palm */}
                <ellipse cx="76" cy="51" rx="15" ry="12" fill="#a0522d" transform="rotate(20 76 51)" />
                <ellipse cx="76" cy="51" rx="9" ry="7" fill="#d2855a" transform="rotate(20 76 51)" />
                {/* Right fingers */}
                <ellipse cx="87" cy="44" rx="4.5" ry="3" fill="#a0522d" transform="rotate(50 87 44)" />
                <ellipse cx="83" cy="40" rx="4.5" ry="3" fill="#a0522d" transform="rotate(70 83 40)" />
                <ellipse cx="77" cy="38" rx="4.5" ry="3" fill="#a0522d" transform="rotate(85 77 38)" />
                <ellipse cx="71" cy="39" rx="4.5" ry="3" fill="#a0522d" transform="rotate(100 71 39)" />

                {/* Tiny peek gaps between fingers */}
                <line x1="57" y1="50" x2="57" y2="55" stroke="#3b1f0a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                <line x1="63" y1="50" x2="63" y2="55" stroke="#3b1f0a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            </g>
        )}

        {/* ════════════════════════════════════════════
            ARMS-DOWN  (password visible)
        ════════════════════════════════════════════ */}
        {showEyes && (
            <g>
                {/* Left arm relaxed down */}
                <path
                    d="M28 92 Q22 106 26 114"
                    stroke="#a0522d"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                />
                <circle cx="26" cy="115" r="8" fill="#a0522d" />
                <circle cx="26" cy="115" r="5" fill="#d2855a" />

                {/* Right arm relaxed down */}
                <path
                    d="M92 92 Q98 106 94 114"
                    stroke="#a0522d"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                />
                <circle cx="94" cy="115" r="8" fill="#a0522d" />
                <circle cx="94" cy="115" r="5" fill="#d2855a" />
            </g>
        )}
    </svg>
);

const Login = () => {
    const [accessKey, setAccessKey] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/admin/admin-login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ accessKey }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem("adminToken", data.token);

            login();
            navigate("/home");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 p-6">

            <motion.form
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-lg bg-white/60 shadow-2xl p-8 rounded-3xl w-full max-w-sm text-center space-y-6 border border-white/40"
            >
                {/* Monkey Animation */}
                <div className="flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={showPass ? "open" : "closed"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="w-28 h-28 flex items-center justify-center"
                        >
                            <MonkeySVG showEyes={showPass} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        IGIDR
                        <span className="text-indigo-600"> Canteen</span>
                    </h1>
                    <p className="text-gray-500 text-lg tracking-[0.3em] mt-1">
                        ADMIN LOGIN
                    </p>
                </div>


                {/* Input */}
                <div className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        className="border border-gray-300 bg-white/70 px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12 transition"
                        placeholder="Enter Admin Key..."
                        value={accessKey}
                        onChange={(e) => setAccessKey(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-purple-600 transition"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm"
                    >
                        {error}
                    </motion.p>
                )}

                {/* Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition w-full font-semibold"
                >
                    {loading ? "Verifying..." : "Unlock Dashboard"}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default Login;