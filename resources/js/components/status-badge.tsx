const colors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Preparing: 'bg-blue-100 text-blue-800',
    Ready: 'bg-purple-100 text-purple-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-gray-200 text-gray-600',
};

export default function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
}