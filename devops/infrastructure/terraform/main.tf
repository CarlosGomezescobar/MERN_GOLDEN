# devops/infrastructure/terraform/main.tf
resource "aws_ecs_service" "backend" {
  name            = "goldencity-backend"
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 2
  deployment_minimum_healthy_percent = 100
}