import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";


function PostList({
  posts,
  handleSelectPost,
  handleDeletePost,
  token,
  authUser,
}) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      {posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            //Cada post agora é um card
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>Por: {post.user.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary" onClick={() => handleSelectPost(post.id)}>Ver detalhes</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
          <p className="text-muted-foreground">
            Nenhum post disponível. Faça o login e clique em "Buscar Posts".
          </p>
        )}
    </div>
  );
}
export default PostList;
