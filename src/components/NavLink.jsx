import React from 'react';

const NavLink = ({ id, label, isAction = false, onClick, isActive }) => (
    <button
        onClick={() => onClick(id)}
        className={`text-sm font-medium transition-all duration-300 relative px-2 ${isAction
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-full px-4 py-1 hover:bg-cyan-500 hover:text-black'
                : isActive
                    ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                    : 'text-slate-400 hover:text-cyan-300'
            }`}
    >
        {label}
        {!isAction && isActive && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] rounded-full"></span>
        )}
    </button>
);

export default NavLink;
