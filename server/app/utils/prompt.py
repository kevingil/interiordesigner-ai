#Process interior design prompt
#Takes json request as input

def generate_prompt(req):
    req_space = req.get('space').lower()
    req_style = req.get('style').lower()
    req_lighting = req.get('lighting')
    req_color = req.get('color').lower()
    req_accent = req.get('accent').lower()
    req_num = req.get('num')
    
    if req_accent == 'any':
        req_accent = ''
    if req_color == 'any':
        req_color = ''
    
    #Additional
    addon_prompt = ''
    if req_space == 'kitchen':
        addon_prompt = f'Modern marble countertops, Embedded appliances. Kitchen island, large window over sink.  With {req_color} flat surface cabinet doors and {req_accent} cabinet hardware. Full kitchen interior design render'
    if req_space == 'living room':
        addon_prompt = f' with couch, TV, {req_color} media console and big window. Full living room interior design render.'
    if req_space == 'dining room':
        addon_prompt = f''
    if req_space == 'bath':
        addon_prompt = f'Large mirror and windows. {req_color} vanity cabinets Full bathroom interior design render.'

    combined_values = f"A {req_space} in a {req_style} design style, {addon_prompt}. {req_lighting} lighting"
    
    num = int(req_num)
    try:
        num = int(req_num)
    except ValueError:
        print("Invalid? Set to 1.")
        num = 1
        
    response = {
        'prompt': combined_values,
        'num': num
    }
    
    print(response)
    return response
