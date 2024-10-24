set -e

HOST="$1"
PORT="$2"
shift 2
cmd="$@"

until nc -z "$HOST" "$PORT"; do
  >&2 echo "Banco de dados não está disponível - aguardando em $HOST:$PORT..."
  sleep 1
done

>&2 echo "Banco de dados está disponível - executando comando: $cmd"
exec $cmd