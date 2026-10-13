import struct, json

path = 'public/models/luxury_grand_mansion.glb'
with open(path, 'rb') as f:
    f.seek(12)
    chunk_length, chunk_type = struct.unpack('<II', f.read(8))
    data = json.loads(f.read(chunk_length).decode('utf-8'))
    
    # House meshes are 0 (Floor), 10 (Roof), 11 (Outside walls), 12 (House inside walls)
    meshes = data.get('meshes', [])
    accessors = data.get('accessors', [])
    
    house_mesh_indices = [0, 1, 2, 6, 7, 8, 10, 11, 12, 13, 18, 23]
    h_min = [float('inf')]*3
    h_max = [float('-inf')]*3
    
    for mi in house_mesh_indices:
        m = meshes[mi]
        for prim in m.get('primitives', []):
            pos_acc_idx = prim.get('attributes', {}).get('POSITION')
            if pos_acc_idx is not None:
                acc = accessors[pos_acc_idx]
                p_min = acc.get('min', [])
                p_max = acc.get('max', [])
                if len(p_min) == 3 and len(p_max) == 3:
                    for i in range(3):
                        h_min[i] = min(h_min[i], p_min[i])
                        h_max[i] = max(h_max[i], p_max[i])

    print("House bounds:", h_min, h_max)
    h_center = [(h_min[i] + h_max[i]) / 2 for i in range(3)]
    h_size = [h_max[i] - h_min[i] for i in range(3)]
    print("House center:", [round(x, 2) for x in h_center])
    print("House size:  ", [round(x, 2) for x in h_size])
