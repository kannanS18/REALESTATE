import struct, json

path = 'public/models/luxury_grand_mansion.glb'
with open(path, 'rb') as f:
    f.seek(12)
    chunk_length, chunk_type = struct.unpack('<II', f.read(8))
    data = json.loads(f.read(chunk_length).decode('utf-8'))
    
    # Outside walls is Mesh 11, Roof is Mesh 10
    meshes = data.get('meshes', [])
    accessors = data.get('accessors', [])
    
    for mi in [10, 11]:
        m = meshes[mi]
        for prim in m.get('primitives', []):
            pos_acc_idx = prim.get('attributes', {}).get('POSITION')
            acc = accessors[pos_acc_idx]
            print(f"Mesh {mi} ({m.get('name')}) min/max:")
            print("  min:", acc.get('min'))
            print("  max:", acc.get('max'))
            center = [(acc['min'][i] + acc['max'][i]) / 2 for i in range(3)]
            print("  center:", [round(x, 2) for x in center])
