def verificar_sequencia(chute):
    # Verificar se a sequência de números fornecidos é crescente
    for i in range(len(chute)-1):
        if chute[i] + 1 == chute[i + 1]:
            return True
    return False

def processar_chute(chute):
    if verificar_sequencia(chute):
        print("Assim é fácil, melhor embaralhar!")
        # Impedir o jogador de usar números da sequência
        return False  # Barrar o chute
    else:
        return True  # Permitir o chute

# Teste
chute = [1, 2, 3]
if processar_chute(chute):
    print("Chute permitido!")
else:
    print("Chute barrado.")
