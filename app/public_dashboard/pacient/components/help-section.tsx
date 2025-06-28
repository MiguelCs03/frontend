export default function HelpSection() {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mt-6 backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-emerald-400 mb-2">IDs de prueba disponibles:</h3>
      <ul className="text-emerald-300">
        <li>• <code className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">12345678</code> - María García López</li>
        <li>• <code className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">87654321</code> - Carlos Mendoza Quispe</li>
      </ul>
    </div>
  )
}
