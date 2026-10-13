import struct, json

path = 'public/models/luxury_grand_mansion.glb'
with open(path, 'rb') as f:
    f.seek(12)
    chunk_length, chunk_type = struct.unpack('<II', f.read(8))
    data = json.loads(f.read(chunk_length).decode('utf-8'))
    nodes = data.get('nodes', [])
    for i, n in enumerate(nodes):
        name = n.get('name', '')
        t = n.get('translation', [0, 0, 0])
        mesh = n.get('mesh')
        print(f"Node {i:02d}: {name:<28} | trans: {t} | mesh: {mesh}")
